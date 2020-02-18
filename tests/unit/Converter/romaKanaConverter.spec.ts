import RomaKanaConverter from '@/Converter/RomaKanaConverter';

describe('ローマ字，かなの変換', () => {
    const converter = new RomaKanaConverter();

    it('かな->ローマ字', () => {
        const rules = new Map<string, string>([
            ['ア', 'a'],
            ['アイウエオ', 'aiueo'],
            ['モ', 'mo'],
            ['モライモライ', 'moraimorai'],
            ['', ''],
        ]);
        rules.forEach((roma, kana) => {
            expect(converter.kana2roma(kana)).toBe(roma);
        })
    });

    it('ローマ字->かな', () => {

    });
});
