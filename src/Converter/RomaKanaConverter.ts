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
            const convertedChar: string | undefined = this.kana2romaDict.get(text.charAt(i));
            if (convertedChar !== undefined) {
                convertedText += convertedChar;
            } else {
                throw new Error('変換できない文字を変換しようとしています');
            }
        }
        return convertedText;
    }

    /**
     * ローマ字をかなに変換する
     * @param {string} ローマ字の文字列 ex. 'aiueo'
     * @returns {string} かなに変換された文字列 ex. 'あいうえお'
     */
    public roma2kana(text: string): string {
        let convertedText: string = '';
        // textを母音区切りの配列にする
        const kanaSplitList: string[] = this.createKanaSplitList(text);
        kanaSplitList.map((roma) => {
            const convertedChar: string | undefined = this.roma2kanaDict.get(roma);
            if (convertedChar !== undefined) {
                convertedText += convertedChar;
            } else {
                throw new Error('変換できない文字を変換しようとしています');
            }
        });
        return convertedText;
    }

    private createKanaSplitList(text: string): string[] {
        const vowels: string[] = ['a', 'i', 'u', 'e', 'o'];
        if (text.length === 0) {
            return [];
        }
        // まず文字の区切れ目のidxを探す
        let kanaCharIdx: number[] = [0];
        for (let i = 0; i < text.length; i++) {
            // 切れ目の基準: 
            // 母音->次の文字から新しい区切り
            if (i + 1 < text.length && vowels.includes(text.charAt(i))) {
                kanaCharIdx.push(i + 1);
            // nが2連続 -> 1つ目のnからみて2文字あとから新しい区切り
            // TODO: nn nnの時は対応できないので追加
            } else if (i + 2 < text.length && i - 1 > 0 && vowels.includes(text.charAt(i-1)) && text.charAt(i) === 'n' && text.charAt(i + 1) === 'n') {
                kanaCharIdx.push(i + 2);
            }
        }
        kanaCharIdx = Array.from(new Set(kanaCharIdx)); // 重複を削除
        const kanaSplitList: string[] = [];
        for (let i = 0; i < kanaCharIdx.length; i++) {
            if (i !== kanaCharIdx.length - 1) {
                kanaSplitList.push(text.slice(kanaCharIdx[i], kanaCharIdx[i + 1]));
            } else {
                kanaSplitList.push(text.slice(kanaCharIdx[i]));
            }
        }
        return kanaSplitList;
    }
}