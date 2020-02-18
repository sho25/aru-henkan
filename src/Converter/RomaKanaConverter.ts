import rules from './rules';

/**
 * ローマ字<=>カタカナの変換クラス
 */
export default class RomaKanaConverter {
    private roma2kanaDict!: Map<string, string>;
    private kana2romaDict!: Map<string, string>;

    constructor() {
        // 変換規則の作成
        this.roma2kanaDict = rules;
        this.kana2romaDict = new Map<string, string>();
        rules.forEach((value: string, key: string) => this.kana2romaDict.set(value, key));
    }

    /**
     * かなをローマ字に変換する
     * @param {string} かなの文字列 ex. 'あいうえお'
     * @returns {string} ローマ字に変換された文字列 ex. 'aiueo'
     */
    public kana2roma(text: string): string {
        let convertedText: string = '';
        // かなを一文字区切りで分割して，それぞれを変換する
        for (let i = 0; i < text.length; i++) {
            const convertedChar: string | undefined = this.kana2romaDict.get(text[i]);
            if (convertedText !== undefined) {
                convertedText += convertedChar;
            } else {
                throw new Error('変換できない文字を変換しようとしています');
            }
        }
        return convertedText;
    }
}