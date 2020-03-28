const path = require('path');
const { spawn, exec } = require('child_process')

const { AFFECTED_CMD } = process.env;
const PROJECT_PREFIX = '@jaycorpstudios';

// Gets affected files by either commits or current staged changes
const getAffectedFiles = async () => {
    const affectedFilesExec = await execShellCommand('$(pwd)/scripts/affected.sh');
    return affectedFilesExec.trim()
};

const getAvailablePackages = async () => {
    const lernaInfoOutput = '$ lerna list'
    const availablePackagesExec = await execShellCommand('yarn list-packages');
    const removeProjectPrefixRegex = PROJECT_PREFIX ? new RegExp(`${PROJECT_PREFIX}\/`, 'g') : '';
    return availablePackagesExec.replace(lernaInfoOutput, '').replace(removeProjectPrefixRegex, '').trim().split('\n');
}

const getDirectAffectedPackages = async (affectedFiles) => {
    // Extract affected packages from list
    const regex = /(packages)\/([\w-_]+)/g;
    const directAffectedPackages = affectedFiles.match(regex) || [];

    // Get the actual registered packages and compare against the affected ones.
    // (this is a sanity check just in case there are extra files that are not packages on the packages/* path.)
    const availablePackages = await getAvailablePackages();
    console.log(availablePackages)
    const vefiriedAffectedPackages = availablePackages.filter( package => directAffectedPackages.includes(`packages/${package}`) )
    if(vefiriedAffectedPackages.length === 0){
        console.log('No affected packages');
        process.exit()
    }

    let uniqueAffectedPackages = new Set();
    vefiriedAffectedPackages.forEach(affectedPackage => uniqueAffectedPackages.add(affectedPackage, true))
    return uniqueAffectedPackages;
}

const getPackagesWithAffectedDependencies = async (affectedPackages) => {
    const availablePackages = await getAvailablePackages();
    return availablePackages.reduce( (affected, package) => {
        const folder = path.resolve(__dirname, `../packages/${package}/package.json`)
        const packageInfo = require(folder);
        const packageDependencies = { ...packageInfo.dependencies, ...packageInfo.devDependencies }
        // check if the affected ones are included on this package. if so include it on the affected ones.
        for(uniqueAffected of affectedPackages.keys()) {
            if(packageDependencies[`@jaycorpstudios/${uniqueAffected}`]){
                console.log(`${uniqueAffected} is included in package ${package}`);
                affected.add(package, true)
            }
        }
        return affected;
    }, new Set(affectedPackages));
}

const execShellCommand = cmd => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout ? stdout : stderr);
        });
    });
}

async function main () {
    try {
        const affectedFiles = await getAffectedFiles();
        console.log('Branch affected files:');
        console.log(affectedFiles)
        
        if(!affectedFiles.length > 0) {
            console.log('No affected packages')
            process.exit()
        }
    
        // Set with unique values
        const directAffectedPackages = await getDirectAffectedPackages(affectedFiles);
        
        if(!directAffectedPackages.size > 0) {
            console.log('No affected packages')
            process.exit()
        }
        
        console.log('Direct affected packages', directAffectedPackages)
        console.log('Looking for dependencies on other packages')
        const uniqueAffectedPackages = await getPackagesWithAffectedDependencies(directAffectedPackages);
        const affectedPackages = [];
        for(package of uniqueAffectedPackages) {
            affectedPackages.push(package);
        }
        
        console.log('Affected Packages', affectedPackages.join(','));

        if(AFFECTED_CMD){
            const prefix = PROJECT_PREFIX ? `${PROJECT_PREFIX}/` : '';
            const scope = affectedPackages.size > 1 ? `${prefix}{${affectedPackages}}` : `${prefix}${affectedPackages}`
            const command = `yarn ${AFFECTED_CMD} --scope=${scope}`;
            const spawnOptions = {
                stdio: 'inherit',
                shell: true,
                detached: true,
            }

            console.log(command);

            const child = spawn(command, spawnOptions);
            child.on('exit', code => {
                process.exit(code);
            });
        }

    } catch(error) {
        console.log(error)
        process.exit(1);
    }
}

main();