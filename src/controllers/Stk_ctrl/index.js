import ResponseService from "../../functions/ResposeService.js";
import stkPush from "../../services/M-Express/index.js";
import newRedisClient from "../../dataStore/redis/index.js";
import log from "../../functions/logger.js";
import pkg from "lodash";
const { constant } = pkg;

class Mpesa_stk_push_controller {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @description
   * Controller to push an stk message
   **/
  async intitiateStkPush(req, res) {
    try {
      const authToken = req.body.authToken;
      delete req.body.authToken;
      const _stkPush = new stkPush(authToken);
      const response = await _stkPush.intitiateStkPush(req.body);
      ResponseService.success(res, response, "success");
    } catch (error) {
      ResponseService.error(res, error);
    }
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @description store stk message in redis cache
   */
  async handleResponse(req, res) {
    try {
      /**
       * get "MerchantRequestID" from redis cache and use it as cache key
       */
      const data = req.body.Body;

      // Retrieve the MerchantRequestID from the callback data
      const cacheKey = data?.stkCallback?.MerchantRequestID;
      
      if (!cacheKey) {
        log.error("Couldn't retrieve MerchantRequestID from the callback data.");
      } else {
        console.log("Storing callback for MerchantRequestID: " + cacheKey);
      
        // Store the full request body in Redis with an expiration time
        await newRedisClient.set(
          cacheKey,                              // Key for Redis storage
          JSON.stringify(req.body.Body),              // Store the full request body as a string
          'EX',                                  // Set expiration
          constant.REDIS_CACHE_EXPIRATION_SEC    // Expiration time in seconds
        );
      
        console.log("Data successfully stored in Redis.");
      }
      ;
    } catch (error) {
      log.error(error);
    }
  }
  /**
   *
   * @param {*} req
   * @param {*} res
   * @description retrieve stk message in redis cache
   */
  async getStkPushResponse(req, res) {
    try {
      const cacheKey = req.params.MerchantRequestID;
      const cacheValue = await newRedisClient.get(cacheKey);

      if (!cacheValue) {
        ResponseService.error(res, "STK push response not found in cache");
        return;
      }
      /**
       * delete stk message in redis cache where the key is equal to cacheKey
       */
      ResponseService.success(
        res,
        JSON.parse(cacheValue),
        "STK push response retrieved from cache and deleted from cache"
      );
    } catch (error) {
      ResponseService.error(res, error);
    }
  }
}
export default new Mpesa_stk_push_controller();
