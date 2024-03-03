import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65e44f60857a397ed4c0");

export const account = new Account(client);

export default client;
