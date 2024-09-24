const { createMapper, SnakeCaseNamingConvention } = require("@automapper/core");
const { pojos } = require("@automapper/pojos");

const mapper = createMapper({
    strategyInitializer: pojos(),
    namingConventions: new SnakeCaseNamingConvention(),
});

module.exports = { mapper };