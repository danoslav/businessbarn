/** Public read for the marketing site; authenticated users can manage in admin. */
export const publicReadAdminWrite = {
  read: () => true,
  create: ({ req }: { req: { user?: unknown } }) => Boolean(req.user),
  update: ({ req }: { req: { user?: unknown } }) => Boolean(req.user),
  delete: ({ req }: { req: { user?: unknown } }) => Boolean(req.user),
}
