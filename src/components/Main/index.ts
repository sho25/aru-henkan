import { Vue, Component } from 'vue-property-decorator';
import { builder, Tokenizer } from 'kuromoji';

@Component
export default class Main extends Vue {
    private initialMessage: string = 'loading dic...';
    private buildSuccess: boolean = false;
    private tokenizer!: any;
    private builder!: any;
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
        )
    }

    /**
     * awaitしながらkuromojiをビルドする
     * @returns Promise.<number>
     */
    private async buildTokenizer(): Promise<number> {
        this.builder = builder({
            dicPath: './dict'
        });

        return await this.builder.build((err: Error, tokenizer: any) => {
            if (err) {
                throw err;
            }
            var tokens = tokenizer.tokenize("有給を取るとなぜか雨が降る");
            console.dir(tokens);
        });
    }
}