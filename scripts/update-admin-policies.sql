-- 指定された管理者メールアドレスを使用するようにポリシーを更新

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "Allow admin full access on events" ON events;
DROP POLICY IF EXISTS "Allow admin full access on news" ON news;

-- 新しい管理者メールアドレスでポリシーを作成
CREATE POLICY "Allow admin full access on events" ON events
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

CREATE POLICY "Allow admin full access on news" ON news
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

-- 確認メッセージ
DO $$
BEGIN
    RAISE NOTICE '管理者ポリシーが更新されました: elt@toyoiryo.ac.jp';
END $$;
