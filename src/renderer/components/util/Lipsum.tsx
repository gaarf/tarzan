import React from "react";

type LipsumProps = {
  count?: number;
};

const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed consectetur massa, vel condimentum mauris. Donec ornare, justo in semper congue, nulla sem consectetur turpis, vitae tincidunt arcu purus at metus. In hac habitasse platea dictumst. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus dapibus consectetur turpis nec hendrerit. Cras cursus est pretium, ullamcorper sem non, lobortis nulla. Sed scelerisque tristique libero vel vestibulum. In tincidunt arcu ac commodo ultricies. Aliquam a tempus lacus. Nam luctus eros mi, ac finibus magna aliquet ac. Vestibulum eget metus in nisl interdum vulputate. Aenean non justo mauris. Ut iaculis metus at felis malesuada, quis accumsan orci egestas. Donec arcu arcu, placerat ac nisl et, tristique porttitor tortor. Integer condimentum, odio vitae efficitur sagittis, diam sem tristique magna, non pharetra justo elit et purus.",
  "Vestibulum ipsum turpis, tristique vel convallis ut, tincidunt vel elit. Nam porttitor nisl sit amet erat dictum suscipit. Nullam lorem tellus, commodo eget augue eu, luctus auctor nulla. Ut commodo, odio mollis suscipit vehicula, elit dolor dictum orci, non hendrerit lacus risus ut tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus feugiat imperdiet magna nec hendrerit. Nunc leo purus, pulvinar vitae ex id, posuere rutrum quam. Vivamus at congue nulla. Suspendisse condimentum est eu lacus pellentesque, eget tempor mauris luctus. Suspendisse potenti.",
  "Morbi ipsum ipsum, condimentum at luctus rutrum, euismod eu metus. Pellentesque rhoncus turpis nec lobortis fringilla. Suspendisse eleifend justo risus. Morbi in dui non odio condimentum condimentum ac eu lacus. Nullam sit amet efficitur nulla, ac efficitur ligula. Sed sem neque, dignissim sed consequat vitae, tempor eu odio. Vestibulum nulla mauris, sollicitudin viverra tincidunt sed, porta sit amet velit. Mauris sodales magna justo, id pulvinar magna aliquam ut. Aenean eu odio ac sapien ullamcorper dapibus eget in lectus.",
  "Curabitur blandit quis elit in pulvinar. In bibendum mi quis massa finibus iaculis. Donec a pulvinar neque. Aliquam varius felis laoreet est auctor sagittis. Donec iaculis erat vel ipsum gravida facilisis. Aliquam at consectetur felis, non mollis elit. Praesent eget laoreet nunc, at iaculis tellus. Integer rutrum non ligula eu luctus.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi cursus est a faucibus finibus. Aenean vitae finibus odio. Donec consectetur viverra velit, quis porta nisi volutpat consequat. Etiam et diam sit amet nulla tincidunt tempor non sit amet mi. Nulla eu mauris malesuada, rhoncus velit sit amet, imperdiet felis. Maecenas mollis commodo consectetur. Quisque venenatis sapien quis metus malesuada, et auctor orci cursus."
];

const Lipsum: React.FC<LipsumProps> = ({ count }) => {
  // console.log('rendering lipsum');
  return (
    <ul>
      {Array(count || 2)
        .fill(null)
        .map((_, i) => (
          <li key={i}>{LOREM[i % LOREM.length]}</li>
        ))}
    </ul>
  );
};

export default Lipsum;
