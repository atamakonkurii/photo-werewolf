-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
  begin
    insert into public.users (user_id, user_type)
    values (new.id, 'AUTH');

    insert into public.auth_users (user_id)
    values (new.id);
    return new;
  end;
$BODY$;

ALTER FUNCTION public.handle_new_auth_user()
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_auth_user() TO authenticated;

GRANT EXECUTE ON FUNCTION public.handle_new_auth_user() TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_auth_user() TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.handle_new_auth_user() TO anon;

GRANT EXECUTE ON FUNCTION public.handle_new_auth_user() TO service_role;

CREATE trigger on_auth_user_created
  AFTER INSERT ON auth.users
  for each ROW EXECUTE PROCEDURE handle_new_auth_user();
