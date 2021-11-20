export interface ICampaign {
  name: string
  budget: number,
  photoUrl: string
  startDate: Date
  endDate: Date
  ageRange: number[]
  filterTags: string[]
  goals: string
  id: string
  queryText: string
  positivity: number
}

export interface ICampaignData {
  name: string,
  budget: number,
  photoUrl: string
  startDate: Date | null
  endDate: Date | null
  ageRange: number[]
  filterTags: string[]
  goals: string
  queryText: string,
  positivity: number
}
