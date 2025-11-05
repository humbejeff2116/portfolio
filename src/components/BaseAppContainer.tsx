
// TODO... Remove, not in use yet
export default function BaseAppContainer({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="transition-colors duration-700 ease-in-out bg-background-light dark:bg-background-dark text-zinc-900 dark:text-zinc-100 min-h-screen">
            {children}
        </div>
    )
}