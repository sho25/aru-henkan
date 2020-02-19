import RomaKanaConverter from '@/Converter/RomaKanaConverter';

export default class AruHenkanConverter {
    private converter: RomaKanaConverter = new RomaKanaConverter();
    constructor(private tokenizer: any) {
    }

    /**
     * ローマ字の文字列のiをaiに変更して返す
     * @param {string} 変換したい文字列
     * @returns {string} 変換された文字列
     */
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

    /**
     * 文字列を形態素解析してある変換をする
     * @param {string} 変換したい文字列 
     * @returns {string} 変換後の文字列
     */
    public aruHenkan(text: string): string {
        // 形態素解析
        const tokenizedArray = this.tokenizer.tokenize(text);
        for (let token of tokenizedArray) {
            const sur = token['surface_form'] // 元の形
            if (token['pos'] === '名詞') {
                let reading = token['reading']
                if (reading === undefined) {
                    reading = sur;
                }
                const roma = this.converter.kana2roma(reading);
                // ある変換をする
                // i -> ai
                const aruRoma = this.i2ai(roma);
                try {
                    const convertedKana = this.converter.roma2kana(aruRoma);
                    token['aruHenkan'] = convertedKana;
                } catch (error) {
                    token['aruHenkan'] = sur;
                }
            } else {
                token['aruHenkan'] = sur;
            }
        }
        return tokenizedArray.reduce((acc: string, cur: any) => acc += cur['aruHenkan'], '');
    }
}
