export function searchQuery() {
  return {
    index: "movies",
    body: {
      aggs: {
        "0": {
          date_histogram: {
            field: "release_date",
            fixed_interval: "365d",
            time_zone: "Europe/Stockholm",
          },
          aggs: {
            "1": {
              avg: {
                field: "popularity",
              },
            },
          },
        },
      },
      size: 0,
      fields: [
        {
          field: "@timestamp",
          format: "date_time",
        },
        {
          field: "release_date",
          format: "date_time",
        },
      ],
      script_fields: {},
      stored_fields: ["*"],
      runtime_mappings: {},
      _source: {
        excludes: [],
      },
      query: {
        bool: {
          must: [],
          filter: [
            {
              range: {
                release_date: {
                  format: "strict_date_optional_time",
                  gte: "1940-02-22T23:00:00.000Z",
                  lte: "2016-08-16T22:00:00.000Z",
                },
              },
            },
          ],
          should: [],
          must_not: [],
        },
      },
    },
  }
}
