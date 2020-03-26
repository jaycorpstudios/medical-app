const path = require('path');


// Gets affected files by either commits or current changes (no matter if changes are staged)
const getAffectedFiles = async () => {
    const affectedFilesExec = await execShellCommand('$(pwd)/scripts/affected.sh');
    return affectedFilesExec.trim()
};

const getAvailablePackages = async () => {
    const proyectPrefix = /@jaycorpstudios\//g;
    const lernaInfoOutput = '$ lerna list'
    const availablePackagesExec = await execShellCommand('yarn list-packages');
    return availablePackagesExec.replace(lernaInfoOutput, '').replace(proyectPrefix, '').trim().split('\n');
}

const execShellCommand = cmd => {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout ? stdout : stderr);
        });
    });
}

async function main () {
    try {
        console.log('Getting affected files');
        const affectedFiles = await getAffectedFiles();

        if(affectedFiles.length === 0) {
            console.log('No affected packages')
            process.exit()
        }
    
        //extract affected packages from list
        const regex = /(packages)\/([\w-_]+)/g;
        const directAffectedPackages = affectedFiles.match(regex) || [];

        // Get the actual registered packages and compare against the affected ones.
        // (this is a sanity check just in case there are extra files that are not packages on the packages/* path.)
        const availablePackages = await getAvailablePackages(); // ['app1', 'app2', 'lib-1', 'lib-2']
        const vefiriedAffectedPackages = availablePackages.filter( package => directAffectedPackages.includes(`packages/${package}`) ) //affectedPackages ['medical-app', 'medical-rest', 'sheika-theme']
        if(vefiriedAffectedPackages.length === 0){
            console.log('No affected packages');
            process.exit()
        }

        let uniqueAffectedPackages = new Map();
        vefiriedAffectedPackages.forEach(affectedPackage => uniqueAffectedPackages.set(affectedPackage, true))
        
        console.log('Direct affected packages', uniqueAffectedPackages)        
        console.log('Looking for dependencies on other packages')
        let affectedByDepencencies = [];
        // TODO: Reduce
        // get all dependencies for each package
        availablePackages.forEach( package => {
            const folder = path.resolve(__dirname, `../packages/${package}/package.json`)
            const packageInfo = require(folder);
            const packageDependencies = { ...packageInfo.dependencies, ...packageInfo.devDependencies }
            // check if the affected ones are included on this package. if so include it on the affected ones.
            for(uniqueAffected of uniqueAffectedPackages.keys()){
                if(packageDependencies[`@jaycorpstudios/${uniqueAffected}`]){
                    console.log(`${uniqueAffected} is included in package ${package}`);
                    uniqueAffectedPackages.set(package, true)
                    return
                }
            }

        });
        
        console.log('Affected packages', uniqueAffectedPackages.keys())
        // TBD: expose a way to execute commands passing lerna run {job param} --scope=@jaycorpstudios/{medical-app,medical-rest}

    } catch(error) {
        console.log(error)
        process.exit(1);
    }
}


main();