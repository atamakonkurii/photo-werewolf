-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

DROP TABLE IF EXISTS public.room_users CASCADE;

CREATE TABLE IF NOT EXISTS public.game_results
(
    room_id character varying COLLATE pg_catalog."default" NOT NULL,
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    game_result game_result NOT NULL DEFAULT 'UNSETTLLED'::game_result,
    created_at timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text),
    CONSTRAINT room_users_pkey PRIMARY KEY (room_id, user_id),
    CONSTRAINT room_users_room_id_fkey FOREIGN KEY (room_id)
        REFERENCES public.rooms (room_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT room_users_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.game_results
    OWNER to postgres;

ALTER TABLE IF EXISTS public.game_results
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.game_results TO anon;

GRANT ALL ON TABLE public.game_results TO authenticated;

GRANT ALL ON TABLE public.game_results TO postgres;

GRANT ALL ON TABLE public.game_results TO service_role;
