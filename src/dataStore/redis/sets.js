import Redis from 'ioredis';
const client = new Redis("redis://default:5tEfpjGaSU1wMwLkilHuoOd6yUgqouUR@redis-15649.c17.us-east-1-4.ec2.cloud.redislabs.com:15649");

client.on('error', err => console.log('Redis Client Error', err));

export class RedisSets {
    static async addToSet(setKey, ...members) {
        try {
            const response = await client.sadd(setKey, members);
            return response;
        } catch (error) {
            console.error('Error adding to set:', error);
            throw error;
        }
    }

    static async removeFromSet(setKey, ...members) {
        try {
            const response = await client.srem(setKey, members);
            return response;
        } catch (error) {
            console.error('Error removing from set:', error);
            throw error;
        }
    }

    static async getSetMembers(setKey) {
        try {
            const response = await client.smembers(setKey);
            return response;
        } catch (error) {
            console.error('Error getting set members:', error);
            throw error;
        }
    }

    static async isSetMember(setKey, member) {
        try {
            const response = await client.sismember(setKey, member);
            return response === 1;
        } catch (error) {
            console.error('Error checking set membership:', error);
            throw error;
        }
    }

    static async setSize(setKey) {
        try {
            const response = await client.scard(setKey);
            return response;
        } catch (error) {
            console.error('Error getting set size:', error);
            throw error;
        }
    }

    static async getSetIntersection(...setKeys) {
        try {
            const response = await client.sinterstore('temp_intersection', setKeys);
            const members = await client.smembers('temp_intersection');
            await client.del('temp_intersection');
            return members;
        } catch (error) {
            console.error('Error getting set intersection:', error);
            throw error;
        }
    }

    static async getSetUnion(...setKeys) {
        try {
            const response = await client.sunionstore('temp_union', setKeys);
            const members = await client.smembers('temp_union');
            await client.del('temp_union');
            return members;
        } catch (error) {
            console.error('Error getting set union:', error);
            throw error;
        }
    }

    static async getSetDifference(setKey, ...otherSetKeys) {
        try {
            const response = await client.sdiffstore('temp_diff', setKey, otherSetKeys);
            const members = await client.smembers('temp_diff');
            await client.del('temp_diff');
            return members;
        } catch (error) {
            console.error('Error getting set difference:', error);
            throw error;
        }
    }

    static async popRandomFromSet(setKey) {
        try {
            const response = await client.spop(setKey);
            return response;
        } catch (error) {
            console.error('Error popping random member:', error);
            throw error;
        }
    }

    static async getRandomSetMembers(setKey, count = 1) {
        try {
            const response = await client.srandmember(setKey, count);
            return response;
        } catch (error) {
            console.error('Error getting random members:', error);
            throw error;
        }
    }

    static async clearSet(setKey) {
        try {
            const response = await client.del(setKey);
            return response;
        } catch (error) {
            console.error('Error clearing set:', error);
            throw error;
        }
    }
}