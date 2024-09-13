import { object, string ,number} from "zod";

const data_schema = object({
    body: object({
        MerchantName: string({
            required_error: "Please provide a valid MerchantName"
        }),
        RefNo: string({
            required_error: "Please provide a valid RefNo"
        }),
        Amount: number({
            required_error: "Please provide a valid Amount"
        }),
        TrxCode: string({
            required_error: "Please provide a valid TrxCode"
        }),
        CPI: string({
            required_error: "Please provide a valid CPI"
        }),
        Size: string({
            required_error: "Please provide a valid Size"
        })
    })
});


export default data_schema;