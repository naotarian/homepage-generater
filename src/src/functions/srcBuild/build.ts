import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

// テンプレートプロジェクトのディレクトリ
const templateProjectDir: string = path.join(__dirname, '..','..', 'user-template');

// 大元のプロジェクトのtmpディレクトリ
const destinationDir: string = path.join(__dirname, '..', '..', 'tmp');

// テンプレートプロジェクトをビルドする関数
function buildTemplateProject(): void {
    console.log('Building template project...');
    try {
        execSync('yarn build', { cwd: templateProjectDir, stdio: 'inherit' });
    } catch (error) {
        console.error('Error building template project:', error);
        throw error;
    }
}

// ビルド生成物をコピーする関数
function copyBuildOutput(): void {
    const buildDir: string = path.join(templateProjectDir, '.next');
    console.log('Copying build output to tmp directory...');

    // コピー先ディレクトリをクリアする
    fs.emptyDirSync(destinationDir);

    // .nextディレクトリをコピーする
    fs.copySync(buildDir, destinationDir, { overwrite: true });

    // publicディレクトリの内容をコピーする
    const publicDir: string = path.join(templateProjectDir, 'public');
    if (fs.existsSync(publicDir)) {
        fs.copySync(publicDir, path.join(destinationDir, 'public'), { overwrite: true });
    }

    console.log('Build output copied successfully.');
}

// メイン関数
export function main(): void {
    try {
        console.log('test')
        buildTemplateProject();
        copyBuildOutput();
        console.log('Template project built and copied successfully.');
    } catch (error) {
        console.error('Error building and copying template project:', error);
    }
}

// スクリプトを実行
main();