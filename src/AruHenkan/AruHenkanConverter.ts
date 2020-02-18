import RomaKanaConverter from '@/Converter/RomaKanaConverter';

export default class AruHenkanConverter {
    private converter: RomaKanaConverter = new RomaKanaConverter();
    constructor(private tokenizer: any) {
    }

    private i2ai(text: string): string {
        let convertedText = '';
        for (let i = 0; i < text.length; i++) {
            if (text.charAt(i) === 'i') {
                convertedText += 'ai';
            } else {
                convertedText += text.charAt(i);
            }
        }
        return convertedText;
    }

    public aruHenkan(text: string): string {
        const tokenizedArray = this.tokenizer.tokenize(text);
        console.log(tokenizedArray);
        for (let token of tokenizedArray) {
            const sur = token['surface_form'] // 元の形
            if (token['pos'] === '名詞') {
                let reading = token['reading']
                if (reading === undefined) {
                    reading = sur;
                }
                console.log(reading);
                const roma = this.converter.kana2roma(reading);
                // ある変換をする
                // i -> ai
                const aruRoma = this.i2ai(roma);
                const convertedKana = this.converter.roma2kana(aruRoma);
                token['aruHenkan'] = convertedKana;
            } else {
                token['aruHenkan'] = sur;
            }
        }
        let aruHenkan = '';
        tokenizedArray.map((token: any) => aruHenkan += token['aruHenkan']);
        return aruHenkan;
    }
}
