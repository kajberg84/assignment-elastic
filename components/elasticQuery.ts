/**
 * ElasticQuery
 *
 * @export
 * @return { object } - The query object for elastic search
 */
export function searchQuery() {
  return {
    index: "movies",
    body: {
      aggs: {
        reldate_popu: {
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
                  gte: "1960-04-22T08:24:54.456Z",
                  lte: "2022-04-22T07:24:54.456Z",
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

export function searchQuery2() {
  return {
    index: "movies",
    body: {
      aggs: {
        reldate_popu: {
          date_histogram: {
            field: "release_date",
            fixed_interval: "365d",
            time_zone: "Europe/Stockholm",
          },
          aggs: {
            "1": {
              sum: {
                field: "budget",
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
                  gte: "1960-04-23T07:18:08.194Z",
                  lte: "2022-04-23T06:18:08.194Z",
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