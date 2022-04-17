-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE trigger on_auth_user_created
  AFTER INSERT ON auth.users
  for each ROW EXECUTE PROCEDURE handle_new_auth_user();