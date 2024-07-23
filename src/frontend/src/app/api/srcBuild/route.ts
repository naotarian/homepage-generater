import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

/**
 * テンプレートプロジェクトのディレクトリ
 */
const templateProjectDir: string = path.join(process.cwd(), 'src', 'user-template');

/**
 * 大元のプロジェクトの tmp ディレクトリ
 */
const destinationDir: string = path.join(process.cwd(), 'src', 'tmp');

// テンプレNext.js PJをコピー
// テンプレートプロジェクトをディレクトリごと別名でコピーする関数
function copyTemplateProject(): void {
    const newProjectDir = path.join(destinationDir, 'user-1');
    console.log(`Copying template project to ${newProjectDir}...`);

    // コピー先ディレクトリを作成する（存在しない場合）
    fs.ensureDirSync(destinationDir);

    // テンプレートプロジェクトを新しいディレクトリ名でコピーする
    fs.copySync(templateProjectDir, newProjectDir, { overwrite: true });

    console.log('Template project copied successfully.');
}

/**
 * テンプレートプロジェクトをビルドする関数
 */
function buildTemplateProject(): void {
    console.log('Building template project...');
    try {
        // 詳細なエラーログを追加
        console.log(`Running 'yarn build' in ${templateProjectDir}`);
        execSync('yarn build', { cwd: path.join(process.cwd(), 'src', 'tmp', 'user-1'), stdio: 'inherit' });
        console.log('Build completed successfully.');
    } catch (error) {
        console.error('Error building template project:', error);
        throw error;
    }
}


/**
 * GETリクエストハンドラー
 *
 * @param {NextRequest} req - リクエストオブジェクト
 * @returns {Promise<NextResponse>} レスポンスオブジェクト
 */
export async function GET(req: NextRequest) {
    try {
        copyTemplateProject();
        buildTemplateProject();
        // copyBuildOutput();
        return NextResponse.json({ message: 'Template project built and copied successfully.' });
    } catch (error) {
        console.error('Error building and copying template project:', error);
        return NextResponse.json({ error: 'Error building and copying template project.' });
    }
}