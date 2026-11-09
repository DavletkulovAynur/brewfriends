export function WelcomeHero() {
    return (
        <section className="relative flex aspect-[1199/1500] flex-col justify-between">
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-top bg-no-repeat"
                style={{
                    backgroundImage: "url('/preview.png')",
                    backgroundSize: "100% auto",
                }}
            />
        </section>
    );
}