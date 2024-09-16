import { object, number, string } from "zod";


const data_schema = object({
    body:object({
        OriginatorConversationID:string({
            required_error: "Please provide a valid OriginatorConversationID"
        }),
        InitiatorName: string({
            required_error: "Please provide a valid InitiatorName"
        }),
        SecurityCredential: string({
            required_error: "Please provide a valid SecurityCredential"
        }),
        CommandID: string({
            required_error: "Please provide a valid CommandID"
        }),
        Amount: number({
            required_error: "Please provide a valid Amount"
        }),
        PartyA: number({
            required_error: "Please provide a valid PartyA"
        }),
        PartyB: number({
            required_error: "Please provide a valid PartyB"
        }),
        Remarks: string({
            required_error: "Please provide a valid Remarks"
        }),
        QueueTimeOutURL: string({
            required_error: "Please provide a valid QueueTimeOutURL"
        }),
        ResultURL: string({
            required_error: "Please provide a valid ResultURL"
        }),
        Occasion: string({
            required_error: "Please provide a valid Occasion"
        }),
        authToken : string({
            required_error: "Please provide a valid authToken"
        })

})
})

export default data_schema;


