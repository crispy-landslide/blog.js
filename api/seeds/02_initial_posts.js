/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      title: 'GitHub to require 2FA from active developers by the end of 2023',
      content: `GitHub announced today that all users who contribute code on its platform (an estimated 83 million developers in total) will be required to enable two-factor authentication (2FA) on their accounts by the end of 2023. Active contributors who will have to enable 2FA include but are not limited to GitHub users who commit code, use Actions, open or merge pull requests, or publish packages. Developers can use one or more 2FA options, including physical security keys, virtual security keys built into devices like phones and laptops, or Time-based One-Time Password (TOTP) authenticator apps.
      Even though SMS-based 2FA is also an option (in some countries), GitHub urges switching to security keys or TOTPs since threat actors can bypass or steal SMS 2FA auth tokens. "GitHub.com organization and enterprise owners can also require 2FA for members of their organizations and enterprises," Chief Security Officer Mike Hanley said. "Note that organization and enterprise members and owners who do not use 2FA will be removed from the organization or enterprise when these settings are enabled." This is GitHub\'s latest step to further secure the software supply chain from attacks by moving away from basic password-based auth.
      The code hosting platform previously announced that it would require email-based device verification and the deprecation of account passwords for authenticating Git operations. GitHub also disabled password auth via the REST API in November 2020 and added support for securing SSH Git operations using FIDO2 security keys in May 2021. GitHub also improved account security over the years by adding two-factor authentication, sign-in alerts, blocking the use of compromised passwords, and WebAuthn support.`,
      username: 'user1',
      public: 1,
      created: new Date('2022-01-30T16:32:19Z'),
      modified: new Date('2022-01-30T16:32:19Z')
    },
    {
      title: 'FAA urges airlines to replace altimeters that can\'t filter out 5G signals',
      content: `The Federal Aviation Administration is reportedly urging airlines to retrofit or replace altimeters that receive transmissions from outside their allotted frequencies. The FAA is meeting Wednesday "with telecom and airline industry officials on a push to retrofit and ultimately replace some airplane radio altimeters that could face interference from C-Band 5G wireless service," Reuters reported Tuesday.
      The Reuters report continued: The FAA wants to use the meeting to establish "an achievable timeframe to retrofit/replace radar altimeters in the US fleet," according to a previously unreported letter from the FAA\'s top aviation safety official Chris Rocheleau reviewed by Reuters. It also asked aviation representatives "to offer options and commit to actions necessary to meet these objectives." Some altimeters used by airplanes to measure altitude apparently cannot filter out transmissions from C-Band frequencies assigned to wireless carriers for 5G.
      Altimeters are supposed to use frequencies from 4.2 GHz to 4.4 GHz, while wireless carriers\' C-Band licenses are for 3.7 to 3.98 GHz. Retrofits could be achieved with antenna filters that "are currently in production," with one key question being "how to determine which planes are most at risk of interference and should therefore get retrofitted first," the Reuters report said.`,
      username: 'user1',
      public: 0,
      created: new Date('2022-02-25T18:12:12Z'),
      modified: new Date('2022-02-25T18:15:01Z')
    },
    {
      title: 'This time, can Boeing\'s Starliner finally shine?',
      content: `Boeing and NASA say the Starliner spacecraft is ready for a do-over flight, with a second uncrewed test mission of the spacecraft now scheduled for May 19. Nine months have passed since a standard pre-flight check of the spacecraft, then sitting atop a rocket on a launch pad in Florida, found that 13 of 24 oxidizer valves within Starliner\'s propulsion system were stuck.
      The discovery was made within hours of liftoff. Since then, engineers and technicians at Boeing and NASA have worked to fully understand why the valves were stuck and to fix the problem. They found that the dinitrogen tetroxide oxidizer that had been loaded onto the spacecraft 46 days prior to launch had combined with ambient humidity to create nitric acid, which had started the process of corrosion inside the valve\'s aluminum housing. On Tuesday, during a teleconference with reporters, officials from Boeing and NASA discussed the steps they have taken to ameliorate the problem for Starliner\'s upcoming test flight.
      Michelle Parker, vice president and deputy general manager of Boeing Space and Launch, said the valves remain the same on the vehicle but that technicians have sealed up pathways by which moisture might get inside the propulsion system. They are also purging moisture from the valves using nitrogen gas and loading propellants onto Starliner closer to launch. With those mitigations undertaken, Starliner will soon be stacked on top of an Atlas V rocket built by United Launch Alliance. Starliner was in fact due to roll out to the Atlas V launch complex in Florida on Wednesday, but Boeing said the rollout was "paused" due to a hydraulic leak on United Launch Alliance\'s transport vehicle.`,
      username: 'user1',
      public: 1,
      created: new Date('2022-03-10T08:09:01Z'),
      modified: new Date('2022-03-10T08:09:01Z')
    },
    {
      title: 'VW sells out of electric cars in US and Europe',
      content: `Volkswagen, the world\'s second-largest electric vehicle manufacturer by volume, has “sold out” of battery-powered models in the US and Europe for this year as persistent supply chain bottlenecks hit global production. The Wolfsburg-based group, which includes brands such as Porsche, Audi and Škoda, sold more than 99,000 electric models worldwide in the first three months of 2022 as it was hit by a shortage of semiconductors and wiring harnesses made in Ukraine.
      Market leader Tesla delivered more than three times that number in the same quarter. However, VW boss Herbert Diess said that, since demand had remained robust, the company had an order backlog in western Europe of 300,000 electric cars. He added that customers now placing orders in Europe and the US would not get their electric models delivered before 2023. “We have very high order books and… order intake on electric vehicles,” Diess added. “That accounts for all of our models from ID.3, ID.4, the Audi models—[all] are extremely well received in the markets, Škoda models are also very well received in Europe.”`,
      username: 'user2',
      public: 1,
      created: new Date('2022-01-17T15:58:49Z'),
      modified: new Date('2022-01-17T15:58:49Z')
    },
    {
      title: 'NY Times says Wordle drove “tens of millions” of new users, record growth',
      content: `The New York Times\' seven-figure purchase of viral hit Wordle in January was "incredibly valuable" to the company and was responsible for "an unprecedented tens of millions of new users to The Times," the media giant said in announcing its quarterly earnings Wednesday morning. And while New York Times Co. CEO Meredith Kopit Levien said the "majority of these incremental users only played Wordle, many... stayed to play other games, which drove our best quarter ever for net subscriber additions to Games." Levien said during an earnings call that the number of average weekly users for the Times\' non-Wordle games "nearly doubled" during the quarter ending in March. The game "played an outsized role in the quarter\'s engagement and subscriber growth," she added. The Wordle acquisition was part of a larger effort to make The New York Times seem "more valuable to more people by helping them make the most of their lives and passions," Levien said during the call.
      Wordle has remained a free and ad-free daily offering under the Times\' ownership. Instead of creating revenue directly, the game serves as something of a loss leader for the Times\' Games subscription—a bundle that includes full access to its popular crosswords and other daily puzzles like Spelling Bee and Vertex. That access is available as a $40-per-year annual standalone subscription and in an "All Digital Access" bundle that also includes access to news, recipes, Wirecutter product recommendations, and the recently acquired Athletic. While the Times doesn\'t break out its Games subscriptions separately, the company says it netted 387,000 total new digital-only subscriptions for the quarter, including 312,000 that had access to its news product. The Times now boasts over 8.3 million digital-only subscribers, including 6.15 million that have access to news and an overlapping 2.56 million with "multi-product" subscriptions (which likely includes many Games subscribers). The Times\' nearly 800,000 print subscribers also enjoy full access to its digital games, the company said.`,
      username: 'user2',
      public: 0,
      created: new Date('2022-02-20T17:42:14Z'),
      modified: new Date('2022-02-27T17:52:14Z')
    },
    {
      title: 'Microsoft open-sourced the code for 1995\'s 3D Movie Maker because someone asked',
      content: `Back in 1995, the Microsoft Kids division of the company released a program called Microsoft 3D Movie Maker. The same year that the original Toy Story proved that feature-length 3D computer animation was feasible, people could install software on their home computers that could spit out crude-but-creative 3D animated movies at 6 to 8 frames per second. Aside from releasing Doraemon and Nickelodeon-specific versions of Movie Maker later on, Microsoft never really returned to this software... until now.
      Microsoft Developer Division Community Manager Scott Hanselman announced yesterday that Microsoft was open-sourcing the code for 3D Movie Maker, posting it to Github in a read-only repository under an MIT license. The code was released not because Microsoft has grand plans for 3D Movie Maker but because someone asked. Self-described "hardware/software necromancer" Foone Turing asked Microsoft to release the 3D Movie Maker source code back in April because they wanted "to expand and extend it." Hanselman and Microsoft Open Source Programs Office Manager Jeff Wilcox then worked with Microsoft\'s legal department to make it happen.`,
      username: 'user2',
      public: 1,
      created: new Date('2022-04-15T19:31:35Z'),
      modified: new Date('2022-04-16T19:31:35Z')
    },
  ]);
};