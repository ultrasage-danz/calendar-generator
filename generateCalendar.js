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
const puppeteer_1 = __importDefault(require("puppeteer"));
const ejs_1 = __importDefault(require("ejs"));
const data = [
    {
        "date": "2023-09-01",
        "available_slots": [
            { "time": "09:00" },
            { "time": "10:30" }
        ]
    },
    {
        "date": "2023-09-02",
        "available_slots": [
            { "time": "10:00" },
            { "time": "11:30" }
        ]
    }
    // Add more days as needed
];
const generateHTML = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        ejs_1.default.renderFile(__dirname + '/template.ejs', { data }, (err, str) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(str);
            }
        });
    });
});
const generateImage = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setContent(html);
    yield page.screenshot({ path: 'calendar.png', fullPage: true });
    yield browser.close();
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const html = yield generateHTML(data);
    yield generateImage(html);
});
main().catch(console.error);
