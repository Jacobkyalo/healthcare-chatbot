import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65ef3ff94b7fcfabc857");

export const account = new Account(client);

export default client;
