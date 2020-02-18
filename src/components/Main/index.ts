import { Vue, Component, Watch } from 'vue-property-decorator';
import { builder } from 'kuromoji';
import MsgDisplayer from '@/components/MsgDisplayer/index.vue';
import RomaKanaConverter from '@/Converter/RomaKanaConverter';

@Component({
    components: {
        MsgDisplayer,
    }
})
export default class Main extends Vue {
    private userInput: string = 'オタクはモリモリと飯を食え';
    private initialMessage: string = 'loading dic...';
    private buildSuccess: boolean = false;
    private tokenizer!: any;
    private builder!: any;
    private aruHenkan: string = '';
    private aruGyakuHenkan: string = '';
    private converter!: RomaKanaConverter;

    mounted() {
        this.buildTokenizer().then(
            () => {
                this.buildSuccess = true;
                this.initialMessage = 'build success';
            }
        ).catch(
            () => {
                this.initialMessage = 'Loading dic failed.<br>Reload and try again';
            }
        );
        this.aruHenkan = '';
        this.aruGyakuHenkan = 'comming soon...';
        this.converter = new RomaKanaConverter();
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
            this.tokenizer = tokenizer;
            // var tokens = tokenizer.tokenize("有給を取るとなぜか雨が降る");
            // console.dir(tokens);
        });
    }

    @Watch('userInput')
    private convert() {
        // const tokens = this.tokenizer.tokenize(text);
        // return tokens;
    }
}