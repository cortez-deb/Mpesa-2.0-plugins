import { number, string, object } from "zod";

const data_schema = object({
  body: object({
    BusinessShortCode: number({
      required_error: "Please provide a valid BusinessShortCode",
    }),
    TransactionType: string({
      required_error: "Please provide a valid TransactionType",
    }),
    Amount: number({
      required_error: "Please provide a valid amount",
    }),
    PartyA: number({
      required_error: "Please provide a valid PartyA",
    }),
    PartyB: number({
      required_error: "Please provide a valid PartyB",
    }),
    PhoneNumber: number({
      required_error: "Please provide a valid PhoneNumber",
    }),
    CallBackURL: string({
      required_error: "Please provide a valid CallBackURL",
    }),
    AccountReference: string({
      required_error: "Please provide a valid AccountReference",
    }),
    TransactionDesc: string({
      required_error: "Please provide a valid TransactionDesc",
    }),
    authToken: string({
      required_error: "Please provide a valid authToken",
    }),
    ConsumerSecret: string({
        required_error: "Please provide a valid consumer secret key",
    })
  }),
});

export default data_schema;
