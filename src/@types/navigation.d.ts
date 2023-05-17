export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined
      feedback: { isInDiet: boolean }
      meal: {
        day: string
        id: string
      }
      form: {
        day: string
        id: string
      }
      statistics: undefined
    }
  }
}
