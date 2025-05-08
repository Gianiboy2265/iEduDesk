import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('681b74ba0004a67e452c');

export const account = new Account(client);
export { ID } from 'appwrite';
