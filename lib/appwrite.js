import { Client, Account, ID, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('690d16c5002e3ef20b31')

export const account = new Account(client);
export const databases = new Databases(client);

