"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Reddit_1 = __importDefault(require("../Reddit"));
Reddit_1.default.prototype.getTransactions = function getTransactions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const transactionsRawData = yield this.parser.parseAsCSV('reddit_gold_information.csv', options === null || options === void 0 ? void 0 : options.parsingOptions);
        const transactions = transactionsRawData.map((transaction) => ({
            currency: '$',
            value: transaction.cost,
            date: transaction.date,
            product: transaction.transaction_id,
        }));
        return {
            data: transactions,
            parsedFiles: ['reddit_gold_information.csv'],
        };
    });
};
