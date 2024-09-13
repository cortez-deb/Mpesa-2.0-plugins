import ClientCredentials from '../../services/M-Authorization/index.js'
import ResponseService from '../../functions/ResposeService.js'


class MpesaAuthorizationController {
    async getAccessToken(req, res) {
        try {
            const { consumerKey, consumerSecret } = req.body;
            const token = await ClientCredentials.getAccessToken(
              consumerKey,
              consumerSecret
            );
            ResponseService.success(
              res,
              token,
              "Authorization token generated successfully!"
            );
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
}

export default new MpesaAuthorizationController();