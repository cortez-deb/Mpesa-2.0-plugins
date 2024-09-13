import { object, string } from "zod";

const data_schema = object({
    body: object({
        consumerKey: string({
            required_error: "Please provide a valid consumer key"
        }),
        consumerSecret: string(
            {
                required_error: "Please provide a valid consumer secret key"
            }
        )
    })
})

export default data_schema