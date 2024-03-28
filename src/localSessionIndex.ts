/*******************************************************************************
*                                                                              *
*                           localSessionIndex (LSI)                            *
*                                                                              *
*******************************************************************************/

  import {
    throwError,
    ValueIsTextline,
    ValidatorForClassifier, acceptNil, rejectNil,
    expectString, expectNonEmptyString, expectTextline,
  } from 'javascript-interface-library'

/**** some type definitions ****/

  type Textline = string                     // mainly for illustrative purposes
  type URL      = string                                                 // dto.

/**** plain Objects are treated as "Indexable" ****/

  interface Indexable { [Key:string]:any }

/**** ValueIsAutomergeURL ****/

  export function ValueIsAutomergeURL (Value:any):boolean {
// @ts-ignore TS2339 allow "window.automerge"
    return window.automerge.isValidAutomergeUrl(Value)
  }

/**** allow/expect[ed]AutomergeURL ****/

  export const allowAutomergeURL = ValidatorForClassifier(
    ValueIsAutomergeURL, acceptNil, 'automerge session URL'
  ), allowedAutomergeURL = allowAutomergeURL

  export const expectAutomergeURL = ValidatorForClassifier(
    ValueIsAutomergeURL, rejectNil, 'automerge session URL'
  ), expectedAutomergeURL = expectAutomergeURL

export class localSessionIndex {
  private _Index:Indexable = Object.create(null)

/**** get ****/

  public get (SessionName:Textline):URL|undefined {
    expectTextline      ('session name',SessionName)
    expectNonEmptyString('session name',SessionName)

    let Result:URL = this._Index[SessionName]
    return (Result == null ? undefined : 'automerge:' + Result)
  }

/**** set (n.b.: multiple session names may point to the same session URL) ****/

  public set (SessionName:Textline, SessionURL:URL):void {
    expectTextline      ('session name',SessionName)
    expectNonEmptyString('session name',SessionName)
    expectAutomergeURL   ('session URL',SessionURL)

    if (SessionName.trim() === '') throwError(
      'Invalidargument: the given session name is empty'
    )

    this._Index[SessionName] = SessionURL.replace('automerge:','')
  }

/**** delete ****/

  public delete (SessionName:Textline):void {
    expectTextline      ('session name',SessionName)
    expectNonEmptyString('session name',SessionName)

    delete this._Index[SessionName]
  }

/**** NameList ****/

  public get NameList ():Textline[] {
    let Result:Textline[] = []
      for (let SessionName in this._Index) {
        Result.push(SessionName)
      }
    return Result
  }
  public set NameList (_:Textline[]) {
    throwError('ReadOnly: the "NameList" must not be set, it will be calculated')
  }

/**** import (overwrites existing entries) ****/

  public import (serializedStore:string):void {
    expectString('index serialization',serializedStore)

    serializedStore = serializedStore.trim()
    if (serializedStore === '') { return }

    let Store:Indexable
    try {
      Store = JSON.parse(serializedStore)
    } catch (Signal) {
      throwError(
        'InvalidArgument: the given index serialization is no valid JSON string'
      )
      return                                     // just to satisfy the compiler
    }

    for (let Key in Store) {
      const Value = Store[Key]
      if (
        ValueIsTextline(Key) && (Key.trim() !== '') &&
        ValueIsAutomergeURL('automerge:' + Value)
      ) {
        this._Index[Key] = Value
      }
    }
  }

/**** export ****/

  public export ():string {
    return JSON.stringify(this._Index)           // URLs w/o 'automerge:' prefix
  }

/**** preserve ****/

  public preserve ():void {
    localStorage.setItem(
      'Automerge Session Index', JSON.stringify(this._Index)
    )                                            // URLs w/o 'automerge:' prefix
  }

/**** restore (removes any existing entries) ****/

  public restore ():void {
    this._Index = Object.create(null)

    const serializedStore = localStorage.getItem('Automerge Session Index')
    if (serializedStore == null) { return }

    let Store:Indexable
    try {
      Store = JSON.parse(serializedStore)
    } catch (Signal) {
      console.warn('localStorage["Automerge Session Index"] is broken')
      return
    }

    for (let Key in Store) {
      const Value = Store[Key]
      if (
        ValueIsTextline(Key) && (Key.trim() !== '') &&
        ValueIsAutomergeURL('automerge:' + Value)
      ) {
        this._Index[Key] = Value
      }
    }
  }

}
