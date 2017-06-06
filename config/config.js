var Config = {};
Config.db = {};
Config.app={};
Config.auth = {};

Config.db.host = 'researchhub-shard-00-00-fejf5.mongodb.net:27017';
Config.db.name = 'admin';
Config.db.pass = 'ZJ9WWEoGlO2K5zu4';
/* Admin user login- may be needed later 
*/
//Config.db.uri = "mongodb://researchhubadmin:ZJ9WWEoGlO2K5zu4@researchhub-shard-00-00-fejf5.mongodb.net:27017,researchhub-shard-00-01-fejf5.mongodb.net:27017,researchhub-shard-00-02-fejf5.mongodb.net:27017/admin?ssl=true&replicaSet=ResearchHub-shard-0&authSource=admin";
Config.db.uri = "mongodb://marlanarazani:IqkdNCDGbBCUWLmK@researchhub-shard-00-00-fejf5.mongodb.net:27017,researchhub-shard-00-01-fejf5.mongodb.net:27017,researchhub-shard-00-02-fejf5.mongodb.net:27017/researchhub?ssl=true&replicaSet=ResearchHub-shard-0&authSource=admin";

// Use environment defined port or 3000
Config.app.port = process.env.PORT || 3000;

Config.auth.jwtSecret = "very secret secret";

module.exports = Config;
