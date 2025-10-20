export function About() {
  return (
    <section id="about" className="min-h-screen py-20 md:py-32 container">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-sentient mb-12 text-center">
          About <i className="font-light">NAM Rewards</i>
        </h2>

        <div className="space-y-12 font-mono text-sm md:text-base text-foreground/80">
          {/* Abstract */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">Abstract</h3>
            <p className="leading-relaxed">
              NAM is Non-Automated Mined and it's a mobile app that allows users to upload receipts to earn
              a collectible token called NAM Coins. By leveraging blockchain technology, our platform turns
              receipts into a gamified rewarding experience. Unlike existing crypto where the mining pools are
              owned by who controls the most capital, NAM Coins are only mined when your consciousness
              is present to make a purchase. NAM is the first of its kind where the tokens are created and
              distributed based on the user's share of transactions relative to others each day. NAM Coins will
              always be free and users will never have to purchase them to participate. Simply upload
              receipts through the NAM Rewards app and get rewarded to a crypto wallet to start collecting
              them for free.
            </p>
          </div>

          {/* The Problem */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The Problem</h3>
            <p className="leading-relaxed">
              Half the population in the U.S. don't own any assets and they're already priced out of homes
              and stocks. It's also hard to get into crypto because they have to learn about it, be convinced of
              it, and risk their hard earned money just to get started. At the same time, reward apps today
              award points that are nearly worthless, expire, and usually at best, are only worth a few
              percentages of value relative to the purchase.
            </p>
          </div>

          {/* The Solution */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The Solution</h3>
            <p className="leading-relaxed">
              With NAM Rewards, everyone is able to enter the world of crypto by earning NAM Coins for no
              cost. Simply download the NAM Rewards mobile app, upload pictures of receipts on purchases
              you already make, and earn coins straight into a crypto wallet depending on how much you've
              spent relative to other people that day.
            </p>
          </div>

          {/* The Vision */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The Vision</h3>
            <p className="leading-relaxed">
              NAM Coins are created with similar tokenomics as Dogecoin but the way it's created and
              distributed is different. With Dogecoin, the ownership of the mining pool that earns the new
              coins is determined by the amount of wealth a person has to invest in the hardware and upkeep
              to own these automated systems.
            </p>
            <p className="leading-relaxed mt-4">
              NAM Coins are the first to be created and distributed based on how much a person spends in
              their local community relative to other people each day. This is the vision behind NAM which
              stands for Non-Automated Mined. NAM Coins aren't mined by automated processors in data
              centers, instead they're only mined when you're physically present for a transaction.
            </p>
          </div>

          {/* The Philosophy */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">The Philosophy</h3>
            <p className="leading-relaxed">
              The economy is splitting in two. It works for the wealthy but not for most people. Government
              policies, like printing money, boost asset prices such as stocks and real estate. This helps the
              rich but makes life expensive for everyone else. Housing, healthcare, and basics are harder to
              afford. People are spending less, and money isn't moving through the economy like it should
              relative to the amount that's out there.
            </p>
            <p className="leading-relaxed mt-4">
              Our rewards app and token aim to fix this. We want to bring everyone into decentralized finance
              and make them into asset owners so that no one is left behind. By earning tokens through
              uploading receipts, users can join DeFi, trade, and grow their wealth. We also want to make
              spending fun again. You earn tokens only by spending and uploading receipts, which
              encourages people to spend more in their local community. This boosts the economy,
              empowers users, and creates a fairer system where everyone can build wealth.
            </p>
            <p className="leading-relaxed mt-4">
              This is the philosophy of NAM. Funnel everyone into DeFi, turn them into asset owners, and
              create an incentive for people to spend more in their local economy. The protocol will be iterated
              over time to make the distribution more fair in terms of reducing cheaters and exploiters. What
              won't change is the inflation which is 14.4 million tokens per day - the same as Dogecoin. The
              idea is that by creating a memecoin that's more methodical in distribution and a more fair game
              overall, there's no reason NAM Coins can't beat out Dogecoin as the top memecoin over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
