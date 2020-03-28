const path = require('path');
const { spawn, exec } = require('child_process');
const logger = require('../utils/logger');
const { AFFECTED_CMD } = process.env;
const PROJECT_PREFIX = '@jaycorpstudios';

// Gets affected files by either commits or current staged changes
async function getAffectedFiles() {
    const affectedFilesExec = await execShellCommand('$(pwd)/scripts/affected.sh');
    return affectedFilesExec.trim()
};

async function getAvailablePackages() {
    const lernaInfoOutput = '$ lerna list';
    const availablePackagesExec = await execShellCommand('yarn list-packages');
    const removeProjectPrefixRegex = PROJECT_PREFIX ? new RegExp(`${PROJECT_PREFIX}\/`, 'g') : '';
    return availablePackagesExec.replace(lernaInfoOutput, '').replace(removeProjectPrefixRegex, '').trim().split('\n');
}

async function getDirectAffectedPackages(affectedFiles) {
    // Extract affected packages from list
    const regex = /(packages)\/([\w-_]+)/g;
    const directAffectedPackages = affectedFiles.match(regex) || [];
    // Get the actual registered packages and compare against the affected ones.
    // (this is a sanity check just in case there are extra files that are not packages on the packages/* path.)
    const availablePackages = await getAvailablePackages();
    const vefiriedAffectedPackages = availablePackages.filter( package => directAffectedPackages.includes(`packages/${package}`) )
    return new Set(vefiriedAffectedPackages);
}

async function getPackagesWithAffectedDependencies(affectedPackages) {
    const availablePackages = await getAvailablePackages();
    return availablePackages.reduce( (affected, package) => {
        const folder = path.resolve(__dirname, `../packages/${package}/package.json`)
        const packageInfo = require(folder);
        const packageDependencies = { ...packageInfo.dependencies, ...packageInfo.devDependencies }
        // check if the affected ones are included on this package. if so include it on the affected ones.
        for(uniqueAffected of affectedPackages.keys()) {
            if(packageDependencies[`@jaycorpstudios/${uniqueAffected}`]){
                logger.info(`${uniqueAffected} is included in package ${package}`);
                affected.add(package, true)
            }
        }
        return affected;
    }, new Set(affectedPackages));
}

function execShellCommand(cmd) {
    const execAsync = (resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) return reject(error);
            resolve(stdout ? stdout : stderr);
        });
    }
    return new Promise(execAsync);
}

function executeCmdOnAffectedPackages(affectedPackages) {
    const prefix = PROJECT_PREFIX ? `${PROJECT_PREFIX}/` : '';
    const scope = affectedPackages.length > 1 ? `${prefix}{${affectedPackages}}` : `${prefix}${affectedPackages}`
    const command = `yarn ${AFFECTED_CMD} --scope=${scope}`;
    const spawnOptions = {
        stdio: 'inherit',
        shell: true,
        detached: true,
    }
    logger.success(command);

    const child = spawn(command, spawnOptions);
    child.on('exit', code => {
        process.exit(code);
    });
}

async function main () {
    try {
        const affectedFiles = await getAffectedFiles();
        logger.info('Branch affected files:');
        logger.dim(affectedFiles)

        if(!affectedFiles.length > 0) {
            logger.infoBold('No affected packages')
            process.exit()
        }
    
        // Set with unique values
        const directAffectedPackages = await getDirectAffectedPackages(affectedFiles);
        
        if(!directAffectedPackages.size > 0) {
            logger.infoBold('No affected packages')
            process.exit()
        }
        
        logger.info(`Direct affected packages: ${Array.from(directAffectedPackages).join(',')}`)
        logger.dim('Looking for dependencies on other packages')
        const uniqueAffectedPackages = await getPackagesWithAffectedDependencies(directAffectedPackages);
        const affectedPackages = Array.from(uniqueAffectedPackages);
        logger.infoBold(`${affectedPackages.length} total affected packages: ${affectedPackages.join(',')} \n`);

        if(AFFECTED_CMD){
            executeCmdOnAffectedPackages(affectedPackages);
        } else {
            process.exit()
        }
    } catch(error) {
        logger.error(error)
        process.exit(1);
    }
}

main();