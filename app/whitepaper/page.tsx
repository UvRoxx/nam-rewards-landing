import { M1VChart } from "@/components/m1v-chart";

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container max-w-4xl">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-sentient">
              NAM <i className="font-light">Rewards</i>
            </h1>
            <p className="text-xl md:text-2xl font-mono text-foreground/80">
              Transforming Everyday Purchases into Collectible Rewards
            </p>
          </div>

          {/* Abstract */}
          <section className="space-y-4">
            <h2 className="text-3xl font-sentient">Abstract</h2>
            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                NAM Rewards is a mobile app that allows users to mine NAM Coins by uploading pictures of their receipts. The mission is to funnel everyone into decentralized finance, turn them into asset owners, and revitalize spending in local communities.
              </p>
              <p>
                Half the people in the U.S. own nothing and they're already priced out of assets such as houses and stocks. The solution is crypto but people have to make sacrifices in their daily lives to participate which takes away from local communities where money's already tight. Not to mention the amount of scam projects out there, which leads to losses and regrets of getting into crypto in the first place. This is the reason why only 20% of the country owns crypto and why there's only an estimated single digit percentage of people who hold it in their own wallet.
              </p>
              <p>
                With NAM Rewards, users don't need to risk their hard earned money to get started. NAM Coins will always be free to earn. Simply upload receipts on purchases to start collecting. This whitepaper outlines the founder's story, vision, tokenomics, and the business behind NAM Coins.
              </p>
            </div>
          </section>

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-3xl font-sentient">Introduction</h2>
            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                The mobile receipt scanner app vertical is not a new category and centralized products are already wildly popular amongst consumers. Examples include Fetch and Receipt Hog. However, on these apps, when you convert the points to its USD equivalent, it turns out to only be worth a couple cents in points per receipt - with an extra bonus only awarded if there are items that are sponsored by a brand. These points also come with rules such as limitations on how they're spent and expire over time with inactivity.
              </p>
              <p>
                With NAM Rewards, we believe that funneling users into decentralized finance is worth more than any amount of points that can be accumulated in these centralized apps. Even in the worst case scenario that NAM Coins don't gain traction, we believe that users being a part of the new global economy has tremendous more value than the points that can be earned through the incumbents. In defi, people are receiving hundreds, thousands, and sometimes even tens of thousands of dollars in value through airdrops for simply using these products. Since the airdropped NFTs and tokens have value, a person can trade for assets such as Bitcoin without having to risk their hard earned money. This is the way NAM Rewards will turn everyone in the country into asset owners.
              </p>
              <p>
                NAM Rewards is also not a zero-sum game and using it doesn't prevent people from using other receipt scanner apps. We allow each receipt to be used only once on our platform but it can still be used elsewhere.
              </p>
            </div>
          </section>

          {/* The Vision */}
          <section className="space-y-4">
            <h2 className="text-3xl font-sentient">The Vision</h2>
            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                NAM Coins are memecoins created with similar tokenomics as Dogecoin, but the way it's created and distributed is different. With Dogecoin, the ownership of the mining pools that earn new coins are determined by the amount of wealth a person has to invest in the hardware and upkeep to own these automated systems.
              </p>
              <p>
                NAM Coins are the first to be created and distributed based on how much a person spends in their local community relative to other people each day. This is the vision behind NAM which is Non-Automated Mined. NAM Coins aren't mined by automated processors in data centers, instead they're only mined when you're physically present for a transaction.
              </p>
              <p>
                The long term vision is to create a world where everyone receives double digit percentages of value back on their purchases, without having to sign up for various different credit cards and having to open various different loyalty accounts. Not only that, instead of giving value through a permissioned points system which expires and comes with a lot of rules, the vision is to give value through permissionless tokens that can fluctuate in value and be traded for assets that hold value.
              </p>
            </div>
          </section>

          {/* The Philosophy */}
          <section className="space-y-6">
            <h2 className="text-3xl font-sentient">The Philosophy</h2>
            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                The economy is splitting in two. It's working for the wealthy but not for most people. The government is continuously printing money and boosting asset prices such as stocks and real estate. This helps the rich but makes life expensive for everyone else. Housing, healthcare, and basics are harder to afford. People are spending less, and money isn't moving through the economy like it should relative to the amount that's out there. The biggest indicator this is happening is the Velocity of M1 Money Stock - the amount of times the liquid money supply exchanges hands each year. Before the Great Recession, money used to exchange hands over 10 times per year and now that has plummeted to just 1.6 times.
              </p>
            </div>

            {/* M1V Chart */}
            <M1VChart />

            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                Our rewards app and token aims to fix this. We want to bring everyone into decentralized finance and make them into asset owners so that no one is left behind. By earning tokens through receipt uploads, users can join DeFi, trade, and grow their wealth without having to risk their hard earned money. We also want to make spending fun again. You earn tokens only by spending and uploading receipts, which encourages people to spend more in their local community. This boosts the economy, empowers users, and creates a fairer system where everyone can build wealth.
              </p>
              <p>
                This is the philosophy of NAM – funnel everyone into DeFi, turn them into asset owners, and create an incentive for people to spend more in their local economy. The protocol will be iterated over time to make the distribution more fair and reduce cheating. What won't change is the inflation which is 14.4 million tokens per day - the same as Dogecoin. The idea is that by creating a memecoin that's more methodical in distribution, there's no reason why NAM Coins can't beat out the competition to become the top memecoin over time.
              </p>
            </div>
          </section>

          {/* The Tokenomics */}
          <section className="space-y-6">
            <h2 className="text-3xl font-sentient">The Tokenomics</h2>

            <div className="space-y-4">
              <h3 className="text-2xl font-mono font-semibold text-primary">Overview</h3>
              <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
                <p>
                  NAM Coins are memecoins inspired by Dogecoin. We're going to use it to model NAM Coin's tokenomics but with our own takes and improvements. There will be 14.4 million new coins mined each day - the same inflationary rate as Dogecoin. This amounts to 5.256 billion new coins per year in inflation. We believe that Dogecoin has proven that an inflationary token is viable as long as the network continues to grow.
                </p>
                <p>
                  Dogecoin gave early miners a significant advantage by allowing them to mine 100 billion coins, nearly 20 years worth of inflation, in just one and a half years. This created whales and a significant disadvantage for anyone that came after that. As of this month, September 2025, more Dogecoins were mined in that time than every year combined thereafter.
                </p>
                <p>
                  With NAM Coins, there will only be one year pre-mined which is 5.256B NAM Coins to begin. These tokens will be used to fund the project and seed the LP. Otherwise, the inflation will start and remain constant. Everyday, the network will compete for 14.4M NAM Coins. The only advantage early adopters get is that they're competing for the coins against a small group of people when the network is small. As the network grows, more and more people will compete for the same amount, making it harder to stack coins over time.
                </p>
                <p>
                  The distribution of NAM Coins will occur in three phases.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-mono font-semibold text-primary">Phase 1 - Minimum Viable Product</h3>
              <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
                <p>
                  On the launch of the MVP app, the creation and distribution of NAM Coins will start. Users will be able to download the app, start uploading pictures of receipts, and start earning NAM Coins. Each day 50% of the tokens will be issued to the platform and 50% of the tokens will be issued to the users based on their transaction volume. The total issued will be 14.4 million per day, 7.2 million tokens going to both the platform and users. From the user pool, every user will be awarded tokens based on their share of the transaction volume. For example, if a user uploads receipts worth 1% of all the receipts on the network, they'll mine 1% of the eligible tokens that day.
                </p>
                <p className="font-semibold">
                  Tokens Distribution Breakdown:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>50% to NAM Rewards Treasury</li>
                  <li>50% to Users</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-mono font-semibold text-primary">Phase 2 - Business Partnerships</h3>
              <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
                <p>
                  NAM Rewards will partner with businesses to confirm transactions and allow them to start collecting NAM Coins. This will grow the network, reduce fraud, and decentralize the protocol.
                </p>
                <p>
                  In Phase 2, 50% of the tokens, which is 7.2 million, will be reserved for transactions at businesses that have partnered with NAM Rewards. In this pool, 50% of the tokens will be issued to the customer based on their transaction volume, 25% to the businesses, and 25% to the platform.
                </p>
                <p>
                  The rest of the tokens, 7.2 million tokens, will be issued in the same way as Phase 1. Half the tokens from this pool which is 3.6 million will go to the platform and 3.6 million will go to the users. Every transaction is eligible to earn from this pool. However, only verified transactions at partnered businesses will qualify for the new pool.
                </p>
                <p className="font-semibold">
                  Estimated Tokens Distribution Breakdown:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>37.5% to NAM Rewards Treasury</li>
                  <li>50% to Users</li>
                  <li>12.5% to Partnering Businesses</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-mono font-semibold text-primary">Phase 3 - Scale</h3>
              <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
                <p>
                  Over time, with scale, the inflation will stay the same but the protocol will be updated to give a heavier weight for transactions at partnered businesses and give a smaller weight to transactions that occur everywhere else. This is a way to give more weight to the virtuous cycles that grow the network and prevent fraudulent reward claims that ruin the game for everyone else. By working with businesses to confirm the transactions, we can make sure the game remains fair for everyone.
                </p>
                <p>
                  The plan is to increase the weight of tokens issued for transactions through partnered businesses to 90% or more and reduce the weight of unconfirmed transactions down to 10% or less. This model will ensure that every transaction that's working to reinforce and grow the network gets rewarded more while the transactions that can't be directly confirmed still get rewarded but less. It will also give more tokens to the businesses and less to the platform which will increasingly decentralize the ownership over the protocol in the long run.
                </p>
                <p className="font-semibold">
                  Estimated Tokens Distribution Breakdown:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>25% to NAM Rewards Treasury</li>
                  <li>50% to Users</li>
                  <li>25% to Partnering Businesses</li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Business Model */}
          <section className="space-y-4">
            <h2 className="text-3xl font-sentient">The Business Model</h2>
            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                NAM Coins will begin by charging a 2% fee for each transaction. The goal is to create a self sustaining project on the fees alone. However, we intend to remove this fee over time and as mentioned in the tokenomics, businesses in the long run will be able to work with NAM Rewards to confirm receipt transactions by using software provided by NAM Rewards to also start mining NAM Coins. Businesses will simply pay a monthly subscription fee for services such as payment verification, point-of-sale software, and payment gateway in order to give their customers more rewards for each transaction, as well as mine the coins for themselves. In the beginning, the businesses will earn from a pool of 12.5% tokens created each day and eventually move up to about 25% as outlined in the tokenomics.
              </p>
            </div>
          </section>

          {/* The Founder's Story */}
          <section className="space-y-4">
            <h2 className="text-3xl font-sentient">The Founder's Story</h2>
            <div className="font-mono text-sm md:text-base text-foreground/80 leading-relaxed space-y-4">
              <p>
                My name is Sang Nam. I've been obsessing over this problem for over a decade. The problem is scaling decentralized platforms to everyday consumers. I've invested everything, launched startups, and failed many times trying to figure it out. This stubbornness and unwillingness to let go of this problem is what led to NAM Rewards.
              </p>
              <p>
                By decentralized platform, I wasn't thinking about the blockchain. I couldn't understand why heavily centralized platforms like Uber and TaskRabbit dominated the industry compared to more decentralized alternatives where the middleman was less controlling and charged a lot less in fees.
              </p>
              <p>
                So around 2014, I launched my first startup, TaskFriend, a local tasks marketplace. The goal was to create a platform where people can connect and provide them with tools to make decisions for themselves instead of charging a lot in fees and making the decisions for them.
              </p>
              <p>
                What I learned was that the middleman takes on an incredible amount of work to make the transactions happen. They have to build the network, eliminate uncertainties, and take responsibility for the outcome. This is all very expensive which is why they have to charge a lot in fees, be selective of how the platform is designed, and be restrictive of who they allow on the platform. However, the reality is that without the centralized entity, the transaction would've never happened. For example, a ride sharing app where drivers keep most of the money and where the platform doesn't decide who's allowed on the platform or what cars are eligible to drive, is an app no one uses or even knows about.
              </p>
              <p>
                I came to the realization that if you already have the network and a lot of data, you can make this type of platform work. However, the problem is, how do you build the network and collect the data when you have to build it one user at a time, before you have the network or data? With this in mind, there were pivots and new product launches that all failed.
              </p>
              <p>
                Long story short, after observing someone using a centralized receipt scanner app religiously everyday just for the fun of stacking points, I've realized this is the path to bringing decentralized platforms to life. You use the receipt scanner mechanism to build a network, collect data, create incentive mechanisms, and then ultimately you can build decentralized platforms where there's not a lot of fees or involvement of the middleman. And with the success of NAM Rewards, we will build consumer products and marketplaces, using this network and data, to decentralize everything.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
