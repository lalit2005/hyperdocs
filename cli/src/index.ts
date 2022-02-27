#!/usr/bin/env node

import cac from 'cac';
import { mkdirSync, writeFileSync, appendFileSync } from 'fs';
import chalk from 'chalk';
import * as Constants from './constants';

const cli = cac();

cli
  .command('init', 'Create a docs/ folder with required files for Hyperdocs')
  .action(() => {
    console.log('Initializing docs/ folder...');
    // create docs/ folder
    try {
      mkdirSync('docs');
    } catch (_) {
      console.log(
        chalk.red('Hey, it seems like docs/ folder already exists here!')
      );
      process.exit(1);
    }

    // create index.md
    writeFileSync('docs/index.md', Constants.IndexFileContent);

    // create _sidebar.txt
    writeFileSync('docs/_sidebar.txt', Constants.SidebarFileContent);

    // create introduction.md
    writeFileSync('docs/introduction.md', Constants.IntroductionFileContent);

    // create getting-started.md
    writeFileSync(
      'docs/getting-started.md',
      Constants.GettingStartedFileContent
    );

    console.log(chalk.bgGreen.black('Done!'));
    console.log(Constants.NextStepsMessage);
  });

cli
  .command('new <file>', 'Create a new page in docs/ folder')
  .action((file: string) => {
    // check if the current directory is docs/
    if (process.cwd().split('/').pop() === 'docs') {
      console.log(
        chalk.red(
          'Please run this command from a level above docs/ folder to create a new page.'
        )
      );
      process.exit(1);
    }
    file = file.endsWith('.md') ? file : `${file}.md`;

    console.log(`Creating ${file}...`);
    writeFileSync(`docs/${file}`, '# Edit this now \n');
    appendFileSync(`docs/_sidebar.txt`, `${file}\n`);
    console.log(chalk.green.bold(`Done!`));
    console.log(`This page is appended to _sidebar.txt. You can reorder it.`);
  });

cli.help();
cli.version('0.0.4');
cli.parse();
