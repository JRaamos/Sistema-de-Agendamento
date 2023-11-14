"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const app_1 = __importDefault(require("../../app"));
const user_mock_1 = require("../mocks/user.mock");
const barberUser_model_1 = __importDefault(require("../../database/models/barberUser.model"));
const { expect } = chai_1.default;
describe('Login', function () {
    afterEach(() => {
        sinon_1.default.restore();
    });
    it('test /', async function () {
        const { status } = await chai_1.default.request(app_1.default).get('/');
        expect(status).to.be.equal(200);
    });
    it('verifica se é possivel realizar o login com sucesso e se é retornado o token', async function () {
        const stub = sinon_1.default.stub(barberUser_model_1.default, 'findOne').returns(Promise.resolve(user_mock_1.user));
        console.log(stub);
        const { status, body } = await chai_1.default.request(app_1.default).post('/login').send({ email: "jhonyramos46@gmail.com",
            password: "Salmos8318" });
        console.log(body);
        expect(status).to.be.equal(200);
        expect(body).to.have.property('mensage');
        // expect(body).to.be.equal(token.mensage);
    });
});
