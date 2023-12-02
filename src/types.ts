// Note: I mean, I know this is a small project, but I like to keep things organized.
export interface IBeer {
  id: string
  name: string
  tagline: string
  description: string
  imageUrl: string
  abv: number
  ibu: number
  volume: IVolume
  boilVolume: IVolume
  brewersTips: string
  notes: string
  rating: number
  verified: boolean
}

export interface IBeerResponse
  extends Omit<IBeer, 'imageUrl' | 'boilVolume' | 'brewersTips'> {
  image_url: string
  boil_volume: IVolume
  brewers_tips: string
}

export interface IBeerState extends IBeer {
  type?: string
}

export interface IBeerInputs
  extends Omit<IBeer, 'id' | 'volume' | 'boilVolume'> {
  volume: number
  boilVolume: number
}

export interface IFormErrors {
  name: string
  tagline: string
  description: string
  abv: string
  ibu: string
  volume: string
  boilVolume: string
}

export interface IVolume {
  value: number
  unit: string
}

export interface ISlider {
  beer?: IBeerState
  open: boolean
  setOpen: (open: boolean) => void
}
