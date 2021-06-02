import * as SQLite from "expo-sqlite";
import { v4 as uuidv4 } from "uuid";
import { getNow, timeDifference } from "./timeManipulations";

const db = SQLite.openDatabase("db.luna");

// Function that inserts new token instance to sqlite
// contractAddress: ERC20 contract address that represents deployed token contract
// tokenSymbol: It represents token symbol such as DAI, UNI, SUSHI etc.
// decimals: Represents how many decimals that token has, up to 18
export const addTokenToDb = (contractAddress, tokenSymbol, decimals) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists tokens (token_id, contract_address, token_symbol, decimals, created_at);`
      );
      tx.executeSql(
        `insert into tokens (token_id, contract_address, token_symbol, decimals, created_at) values (?, ?, ?, ?, ?);`,
        [uuidv4(), contractAddress, tokenSymbol, decimals, getNow()],
        (result) => resolve(result),
        (t, err) => reject(err)
      );
    });
  });
};

// Function that fetches saved tokens
export const getTokens = (cb, errCb) => {
  db.transaction((tx) => {
    tx.executeSql(
      `create table if not exists tokens (token_id, contract_address, token_symbol, decimals, created_at);`
    );
    tx.executeSql(
      `select * from tokens order by created_at desc;`,
      null,
      (_, { rows }) => {
        cb !== null && cb(rows);
      },
      (err) => {
        errCb !== null && errCb(err);
      }
    );
  });
};
