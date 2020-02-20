import { Vue, Component, Watch } from 'vue-property-decorator';
import { builder } from 'kuromoji';
import AruDisplayer from '@/components/AruDisplayer/index.vue';
import AruHenkanConverter from '@/AruHenkan/AruHenkanConverter';

@Component({
    components: {
        AruDisplayer,
    }
})
export default class Main extends Vue {
    private userInput: string = 'ここに文章を入力';
    private initialMessage: string = 'loading dic...';
    private buildSuccess: boolean = false;
    private builder!: any;
    private aruHenkan: string = '';
    private aruHenkanMap!: any;
    private aruGyakuHenkan: string = '';
    private converter!: AruHenkanConverter;

    mounted() {
        this.buildTokenizer().then(
            () => {
                this.initialMessage = 'build success';
                this.aruHenkan = 'ココにブンサイョウをナイュウライョク';
                this.aruHenkanMap = [
                    {'pos': '名詞', 'aruHenkan': 'ココ'},
                    {'pos': '詞', 'aruHenkan': 'に'},
                    {'pos': '名詞', 'aruHenkan': 'ブンサイョウ'},
                    {'pos': '詞', 'aruHenkan': 'を'},
                    {'pos': '名詞', 'aruHenkan': 'ナイュウライョク'},
                ];
                this.buildSuccess = true;
            }
        ).catch(
            () => {
                this.initialMessage = 'Loading dic failed.<br>Reload and try again';
            }
        );
        this.aruGyakuHenkan = 'comming soon...';
    }

    /**
     * awaitしながらkuromojiをビルドする
     * @returns Promise<number>
     */
    private async buildTokenizer(): Promise<number> {
        this.builder = builder({
            dicPath: './dict'
        });

        return await this.builder.build((err: Error, tokenizer: any) => {
            if (err) {
                throw err;
            }
            this.converter = new AruHenkanConverter(tokenizer);
        });
    }

    @Watch('userInput')
    private convert() {
        this.aruHenkanMap = this.converter.aruHenkan(this.userInput);
        this.aruHenkan = this.aruHenkanMap.reduce((acc: string, cur: any) => acc += cur['aruHenkan'], '');
    }

    private twitterShare() {
        let shareUrl = 'https://twitter.com/intent/tweet?text=';
        const siteUrl = 'https://aru-henkan.herokuapp.com/';
        shareUrl += this.userInput + '%0D↓%0D' + this.aruHenkan + '%0D%20%23ある変換 %20%23aru-henkan-app%0D' + siteUrl;
        location.href = shareUrl;
    }
}