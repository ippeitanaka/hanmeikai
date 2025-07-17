-- 管理者ポリシーを更新して、正しいメールアドレスを使用
DROP POLICY IF EXISTS "Allow admin full access on events" ON events;
DROP POLICY IF EXISTS "Allow admin full access on news" ON news;
DROP POLICY IF EXISTS "Allow admin full access on jobs" ON jobs;

-- 新しい管理者ポリシーを作成
CREATE POLICY "Allow admin full access on events" ON events
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

CREATE POLICY "Allow admin full access on news" ON news
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

CREATE POLICY "Allow admin full access on jobs" ON jobs
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

-- ストレージポリシーも更新
DROP POLICY IF EXISTS "Allow admin to upload job PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin to update job PDFs" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin to delete job PDFs" ON storage.objects;

CREATE POLICY "Allow admin to upload job PDFs" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'job-pdfs' AND
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

CREATE POLICY "Allow admin to update job PDFs" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'job-pdfs' AND
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );

CREATE POLICY "Allow admin to delete job PDFs" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'job-pdfs' AND
        auth.jwt() ->> 'email' = 'elt@toyoiryo.ac.jp'
    );
