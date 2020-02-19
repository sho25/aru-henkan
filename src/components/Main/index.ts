import { Vue, Component, Watch } from 'vue-property-decorator';
import { builder } from 'kuromoji';
import MsgDisplayer from '@/components/MsgDisplayer/index.vue';
import AruHenkanConverter from '@/AruHenkan/AruHenkanConverter';

@Component({
    components: {
        MsgDisplayer,
    }
})
export default class Main extends Vue {
    private userInput: string = 'オタクはモリモリと飯を食え';
    private initialMessage: string = 'loading dic...';
    private buildSuccess: boolean = false;
    private builder!: any;
    private aruHenkan: string = '';
    private aruGyakuHenkan: string = '';
    private converter!: AruHenkanConverter;

    mounted() {
        this.buildTokenizer().then(
            () => {
                this.initialMessage = 'build success';
                this.aruHenkan = 'オタクはモライモライとメサイを食え';
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
        this.aruHenkan = this.converter.aruHenkan(this.userInput);
    }

    private twitterShare() {
        let shareUrl = 'https://twitter.com/intent/tweet?text=';
        const siteUrl = 'http://localhost:8080/';
        shareUrl += this.userInput + '%0D↓%0D' + this.aruHenkan + '%0D%20%23ある変換%0D' + siteUrl;
        location.href = shareUrl;
    }
}