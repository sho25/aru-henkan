import RomaKanaConverter from '@/Converter/RomaKanaConverter';

describe('ローマ字，かなの変換', () => {
    const converter = new RomaKanaConverter();
    const rules = new Map<string, string>([
        ['アイウエオ', 'aiueo'],
        ['ア', 'a'],
        ['モ', 'mo'],
        ['モライモライ', 'moraimorai'],
        ['コンニチハ', 'konnnitiha'],
        ['キビシイ', 'kibisii'],
        ['', ''],
    ]);

    it('かな->ローマ字', () => {
        rules.forEach((roma, kana) => {
            expect(converter.kana2roma(kana)).toBe(roma);
        })
    });

    it('ローマ字をかな基準で分割する', () => {
        expect((converter as any).createKanaSplitList('konnnitiha')).toStrictEqual(['ko', 'nn', 'ni', 'ti', 'ha'])
    });

    it('ローマ字->かな', () => {
        rules.forEach((roma, kana) => {
            expect(converter.roma2kana(roma)).toBe(kana);
        })
    });
});
