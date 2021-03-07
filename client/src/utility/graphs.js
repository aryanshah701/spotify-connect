// Extracts the valence data from the given audio features array
export function extractValenceData(audioFeatures) {
  const valenceData = audioFeatures.map((feature) => feature.valence);
  return valenceData;
}

// Extracts the valence data from the given audio features array
export function extractDanceabilityData(audioFeatures) {
  const danceability = audioFeatures.map((feature) => feature.danceability);
  return danceability;
}

// Bins the given data for a histogram like representation
export function histogram(data, numOfBuckets, min, max) {
  console.log(numOfBuckets);
  let bins = [];
  let binCount = 0;
  let interval = (max - min) / numOfBuckets;

  //Setup Bins
  for (let i = 0; binCount < numOfBuckets; i = ((i + interval) * 100) / 100) {
    bins.push({
      binNum: binCount,
      minNum: i,
      maxNum: ((i + interval) * 100) / 100,
      count: 0,
    });
    binCount++;
  }

  //Loop through data and add to bin's count
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    for (let j = 0; j < bins.length; j++) {
      let bin = bins[j];
      if (item > bin.minNum && item <= bin.maxNum) {
        bin.count++;
        break; // An item can only be in one bin.
      }
    }
  }

  return bins;
}
