-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE POLICY "Enable access to all users"
    ON public.users
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable insert for everyone"
    ON public.users
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK (true);

ALTER TABLE IF EXISTS public.guest_users DROP COLUMN IF EXISTS guest_id;

CREATE POLICY "Enable access to all users"
    ON public.guest_users
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable insert for everyone"
    ON public.guest_users
    AS PERMISSIVE
    FOR INSERT
    TO public
    WITH CHECK (true);
