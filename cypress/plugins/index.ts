/* eslint-disable no-console */
/// <reference types="cypress"/>
import { rmdir } from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const pluginConfig = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Cypress.PluginConfigOptions => {
  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName);

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true })
          .then(() => resolve(null))
          .catch((err: any) => {
            console.error(err);
            reject(err);
          });
      });
    },
    log (message: any) {
      console.log(message);
    },
  });

  if (!config.env) {
    config.env = {};
  }

  config.env.user_username = process.env.CYPRESS_USER_USERNAME;
  config.env.user_password = process.env.CYPRESS_USER_PASSWORD;

  return config;
};

export default pluginConfig;
